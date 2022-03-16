#include "Header.h"
bool _detectCommand = false;
unsigned post_detectCommand = millis();

bool ledyellow = true;
bool ledgreen = false;
bool ledred = true;
int countred = 0;
int countyellow = 0;
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.println("################################################");
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  Serial.print("Message:");
  String mess = "";
  for (int i = 0; i < length; i++) {
    //    Serial.print((char)payload[i]);
    mess += (char)payload[i];
  }
  //  user_enable
  _detectCommand = true;
  buzzer.on();
  post_detectCommand = millis();

  if (mess.indexOf("AT+") != -1) {
    int index1 = mess.indexOf("=") + 1;
    int index2 = mess.length();
    int values = mess.substring(index1, index2).toInt();
    Serial.println();
    Serial.print("Message:");
    Serial.print(mess);
    Serial.print("    values:");
    Serial.println(values);
    if (mess.indexOf("AT+TOGGLE") != -1) { // TOGGLE
      user_enable = values;
      if (user_enable == 0) {
        relay.off(); // On Relay
        green.off(); // On LED Green
        yellow.off(); // On LED Yellow
        times - TimeNo3_Setting;
        publishMQTT();
        delay(400);
      } else {
        fetchAPI();
        times = TimeNo1_Setting;
      }
    } else if (mess.indexOf("AT+LOGO") != -1) { // LOGO
      ledlogo = values;
      ledlogo == 0 ? logo.off() : logo.on();
      //      user_enable = values;
    } else if (mess.indexOf("AT+SLEEP") != -1) { // SLEEP MODE
      //      user_enable = values;
    } else if (mess.indexOf("AT+NIGHT") != -1) { // NIGHT  MODE
      //      user_enable = values;
    } else if (mess.indexOf("AT+PULSE") != -1) {
      Pulse_Setting = values;
    } else if (mess.indexOf("AT+SET") != -1) {
      fetchAPI();
    } else if (mess.indexOf("AT+MODE") != -1) {
      index2 = mess.indexOf("|");
      Serial.print("index2 = ");
      int values = mess.substring(index1, index2).toInt();
      Serial.println(values);
      String js = getHttp("http://dns.sttslife.co:3123/devices/config/" +  String(values));
      String json = js.substring(js.indexOf("[") + 1, js.indexOf("]"));

      StaticJsonDocument<2000> doc2;
      DeserializationError error2 = deserializeJson(doc2, json);
      if (error2) {
        Serial.print(F("2 deserializeJson() failed: "));
        Serial.println(error2.f_str());
        return;
      }
      config_slope = doc2["config_slope"];
      config_tempcutoff = doc2["config_tempcutoff"];
      config_templeak = doc2["config_templeak"];
      config_timeleak = doc2["config_timeleak"];
      config_time1 = doc2["config_time1"];
      config_time2 = doc2["config_time2"];
      config_time3 = doc2["config_time3"];
      config_sleep = doc2["config_sleep"];
      config_pulsecount = doc2["config_pulsecount"];

      // SET VARIABLE
      Slope_Setting = config_slope;     // Slope Setting
      temp_cutoff = config_tempcutoff; // Temp Cutoff
      //end not use
      TempsLeak = config_templeak;        // Temp Leak **
      TimesLeak = config_timeleak;            // Time Leak
      TimeNo1_Setting = config_time1;       // Time No.1 Back
      TimeNo2_Setting = config_time2;      // Time No.2 Start
      TimeNo3_Setting = config_time3;     // Time No.3 End
      countSleep = config_sleep;
      PulseMax_Setting = config_pulsecount;     // Pulse Count(max)

      Serial.println(user_username);
      Serial.println(user_password);
      Serial.println(user_modes);
      Serial.println(user_enable);
      Serial.println(config_slope);
      Serial.println(config_tempcutoff);
      Serial.println(config_templeak);
      Serial.println(config_timeleak);
      Serial.println(config_time1);
      Serial.println(config_time2);
      Serial.println(config_time3);
      Serial.println(config_sleep);
      Serial.println(config_pulsecount);
    }
  }
  Serial.println(mess);
  Serial.println("-----------------------");
  Serial.println("################################################");
}

void reconnect() {
  while (!client.connected()) {
    if (client.connect(clientName.c_str(), mqttUser, mqttPassword)) {
      Serial.println("connected");
      client.subscribe(("R" + String(topic)).c_str());
      client.setCallback(callback);
    } else {
      Serial.print("failed with state ");
      Serial.print(client.state());
    }
  }
}

float tempArray[maxcalTemp];
float avgTempArray[maxAVGTemp];
int indexTempArrray = 0;
int indexAvgTempArrray = 0;

void timeCountPrograms() {
  times += 2;
}

void readTemps() {
  //  int slopeCount = 0;
  ds18b20.requestTemperatures();
  temperature = ds18b20.getTempCByIndex(0) + tempOffset;
  if (_first) {
    old_temp = temperature;
    minTemps = temperature;
    maxTemps = temperature;
    _first = false;
  }
  if (minTemps > temperature)
    minTemps = temperature;
  if (maxTemps < temperature)
    maxTemps = temperature;

  // ########################### Temperature ################################
  int tempCount = 0;
  if (indexTempArrray < maxcalTemp) {
    tempArray[indexTempArrray] = temperature;
    indexTempArrray++;
  } else {
    for (int i = 0; i < maxcalTemp - 1; i++) {
      tempArray[i] = tempArray[i + 1];
    }
    tempArray[maxcalTemp - 1] = temperature;
  }
  for ( tempCount = 0; tempCount < maxcalTemp; tempCount++) {
    if (tempArray[tempCount] == 0.00f) break;
  }
  temperature = 0.00f;
  for ( int j = 0; j < tempCount; j++) {
    temperature += tempArray[j];
  }
  temperature = temperature / tempCount;

  // ##################### AVG Temperature ##########################
  int avgtempCount = 0;
  if (indexAvgTempArrray < maxAVGTemp) {
    avgTempArray[indexAvgTempArrray] = temperature;
    indexAvgTempArrray++;
  } else {
    for (int i = 0; i < maxAVGTemp - 1; i++) {
      avgTempArray[i] = avgTempArray[i + 1];
    }
    avgTempArray[maxAVGTemp - 1] = temperature;
  }
  for ( avgtempCount = 0; avgtempCount < maxAVGTemp; avgtempCount++) {
    if (avgTempArray[avgtempCount] == 0.00f) break;
  }
  avgTemps = 0.00f;
  for ( int j = 0; j < avgtempCount; j++) {
    avgTemps += avgTempArray[j];
  }
  avgTemps = avgTemps / avgtempCount;

  slope = temperature - old_temp;
  old_temp = temperature;

  if (user_enable == 1) {
    if (temperature >= SleepTemps) {
      if (sleeps >= CountSleep_Setting) {
        relay.off(); // On Relay
        green.off(); // On LED Green
        yellow.off(); // On LED Yellow
        _sleep = true;
      } else {
        sleeps++;
        _sleep = false;
      }
    } else {
      _sleep = false;
      sleeps = 0;
      startFunc();
    }
  }


  Serial.print("temperature is: ");
  Serial.print(temperature);
  Serial.print("   TIME is: ");
  Serial.print(times);
  Serial.print("   Slope is: ");
  Serial.print(slope);
  Serial.print("   Pulse is: ");
  Serial.print(pulse);
  Serial.print("   Pulse_Setting is: ");
  Serial.print(Pulse_Setting);
  Serial.print("   Sleeps is: ");
  Serial.println(sleeps);
  publishMQTT();
}

bool _Start = false;
int countRelay = 0;
bool yellow_state = false;
int old_timeCut = 0;
bool _sleepMode = false;
void startFunc() {
  if (!_Start) {
    if (temperature >= TempsLeak && times >= TimesLeak) {
      yellow_state = !yellow_state;
      if (yellow_state) {
        if (yellow.getStatus() == 1) {
          countyellow++;
        }
        yellow.on();
      } else {
        yellow.off();
      }
    } else {
      if (times >= TimeNo1_Setting)
        if (slope <= -0.005) {
          if (yellow.getStatus() == 1) {
            countyellow++;
          }
          yellow.on();
        } else {
          yellow.off();
        }
    }

    relay.off();
  } else {
    countRelay += 2;
    if (countRelay >= relayStartTime) {
      _Start = false;
      relay.off();
    }
    yellow.off();
    if (relay.getStatus() == 0) {
      countred++;
      countnew++;
    }
    relay.on();
  }

  if (times >= TimeNo2_Setting) {

    /*
      SleepTemps
      countSleep = 0;
      CountSleep_Setting = 450;
    */


    if (slope >= 0.20 && pulse > 0)
      pulse = 0;

    if (slope == 0.0 && times > TimeNo3_Setting) {
      times = TimeNo1_Setting;
      pulse = 0; // Pulse
      //      sleeps = 0; // Sleep

      int timeCut =  times - TimeNo3_Setting;
      // ##
      //      if (old_timeCut == 0) {
      //        old_timeCut = timeCut;
      //      }
      //      int timecCals = timeCut - old_timeCut;
      if (timeCut < 20) {
        PulseMax_Setting = PulseMax_Setting - 20;
      } else {
        PulseMax_Setting = PulseMax_Setting + 20;
      }
      //      old_timeCut = timeCut;
      // @@
    } else if (slope <= 0.00 && slope >= (Slope_Setting * -1)  && times < TimeNo3_Setting) {
      //      times = TimeNo1_Setting;
      pulse ++; // Pulse
      if (pulse >= Pulse_Setting) {
        _Start = true;
        yellow.off();
        if (relay.getStatus() == 0) {
          countred++;
          countnew++;
        }
        relay.on();
        countRelay = 0;
        pulse = 0;
      }
      //      sleeps = 0; // Sleep
    }
  }
}

bool _green = false;
void ledStatus() {
  if (_sleep) {
    relay.off(); // On Relay
    green.off(); // On LED Green
    yellow.off(); // On LED Yellow
  } else {
    _green = !_green;
    (_green) ? green.on() : green.off();
  }
}

int mode_id = 0;
bool enable = true;
void publishMQTT() {
  Serial.print("Send....");
  //  digitalWrite(LED_BUILTIN, HIGH);
  if (user_enable == 0) {
    ledgreen = false;
    ledyellow = false;
    ledred = false;
    relay.off(); // On Relay
    green.off(); // On LED Green
    buzzer.off(); // Off Buzzer
    yellow.off(); // On LED Yellow
  }
  else {
    ledgreen = !ledgreen;
    ledyellow = !ledyellow;
    ledred = !ledred;
    //    countred ++;
    //    countyellow++;
  }
  //  if (countred >= 100) countred = 73;
  //  if (countyellow >= 100) countyellow = 11;

  String json = "{";
  json += "\"user_id\": \"" + String(topic) + "\",";
  json += "\"ledr\": \"" + String(relay.getStatus()) + "\",";
  json += "\"ledy\": \"" + String(!yellow.getStatus()) + "\",";
  json += "\"ledg\": \"" + String(ledgreen) + "\",";
  json += "\"countred\": \"" + String(countred) + "\",";
  json += "\"countyellow\": \"" + String(countyellow) + "\",";
  json += "\"temp\": \"" + String(temperature, 2) + "\",";

  json += "\"avgt\": \"" + String(avgTemps) + "\",";
  json += "\"slope\": \"" + String(slope) + "\",";
  json += "\"minT\": \"" + String(minTemps) + "\",";
  json += "\"maxT\": \"" + String(maxTemps) + "\",";
  json += "\"t\": \"" + String(times) + "\",";
  json += "\"pulse\": \"" + String(pulse) + "\",";
  json += "\"sleeps\": \"" + String(sleeps) + "\",";
  //  json += "\"pulseset\": \"" + String(Pulse_Setting) + "\",";
  json += "\"mode_id\": \"" + String(mode_id) + "\"";
  json += "}";
  client.publish(topic.c_str(), json.c_str());
  Serial.println(" Ok");
  //  digitalWrite(LED_BUILTIN, LOW);
}

void printData() {
  Serial.println();
  Serial.println();
  Serial.println("##################### DATA ##########################");
  Serial.print("temperature = ");
  Serial.print(temperature);
  Serial.println(" °C");
  Serial.print("AVG temperature = ");
  Serial.print(avgTemps);
  Serial.println(" °C");
  Serial.print("Slope is: ");
  Serial.println(slope);
  Serial.print("minTemps is: ");
  Serial.print(minTemps, 2);
  Serial.println(" °C");
  Serial.print("maxTemps is: ");
  Serial.print(maxTemps, 2);
  Serial.println(" °C");
  Serial.print("TIME is: ");
  Serial.println(times);
  Serial.print("Pulse is: ");
  Serial.println(pulse);
  Serial.print("Sleep is: ");
  Serial.println(sleeps);
  Serial.println("#####################################################");
}

String getHttp(String url) {
  HTTPClient http;
  http.begin(url); //HTTP
  int httpCode = http.GET();
  if (httpCode > 0) {
    //    Serial.printf("[HTTP] GET... code: %d\n", httpCode);
    if (httpCode == HTTP_CODE_OK) {
      String payload = http.getString();
      http.end();
      return payload;
    }
  } else {
    //    Serial.printf("[HTTP] GET... failed, error: %s\n", http.errorToString(httpCode).c_str());
    http.end();
    return http.errorToString(httpCode).c_str();
  }
}

void fetchAPI() {
  if (WiFi.status() == WL_CONNECTED) {
    String js = getHttp("http://dns.sttslife.co:3123/devices/users/" + user_username);
    String json = js.substring(js.indexOf("[") + 1, js.indexOf("]"));

    StaticJsonDocument<1000> doc;
    DeserializationError error = deserializeJson(doc, json);
    if (error) {
      Serial.print(F("1 deserializeJson() failed: "));
      Serial.println(error.f_str());
      return;
    }

    const char* datas = doc["user_username"]; user_username = datas;
    datas = doc["user_password"]; user_password = datas;
    user_id = doc["user_id"];
    user_modes = doc["user_modes"];
    user_enable = doc["user_enable"];
    Pulse_Setting = doc["user_pulseset"];
    ledlogo = doc["logo"];
    ledlogo == 0 ? logo.off() : logo.on();
    js = getHttp("http://dns.sttslife.co:3123/devices/config/" +  String(user_modes));
    json = js.substring(js.indexOf("[") + 1, js.indexOf("]"));

    StaticJsonDocument<2000> doc2;
    DeserializationError error2 = deserializeJson(doc2, json);
    if (error2) {
      Serial.print(F("2 deserializeJson() failed: "));
      Serial.println(error2.f_str());
      return;
    }
    config_slope = doc2["config_slope"];
    config_tempcutoff = doc2["config_tempcutoff"];
    config_templeak = doc2["config_templeak"];
    config_timeleak = doc2["config_timeleak"];
    config_time1 = doc2["config_time1"];
    config_time2 = doc2["config_time2"];
    config_time3 = doc2["config_time3"];
    config_sleep = doc2["config_sleep"];
    config_pulsecount = doc2["config_pulsecount"];
    CountSleep_Setting = doc2["config_sleep"];

    // SET VARIABLE
    Slope_Setting = config_slope;     // Slope Setting
    temp_cutoff = config_tempcutoff; // Temp Cutoff
    //end not use
    TempsLeak = config_templeak;        // Temp Leak **
    TimesLeak = config_timeleak;            // Time Leak
    TimeNo1_Setting = config_time1;       // Time No.1 Back
    TimeNo2_Setting = config_time2;      // Time No.2 Start
    TimeNo3_Setting = config_time3;     // Time No.3 End
    countSleep = config_sleep;
    PulseMax_Setting = config_pulsecount;     // Pulse Count(max)

    Serial.println(user_username);
    Serial.println(user_password);
    Serial.println(user_modes);
    Serial.println(user_enable);
    Serial.println(config_slope);
    Serial.println(config_tempcutoff);
    Serial.println(config_templeak);
    Serial.println(config_timeleak);
    Serial.println(config_time1);
    Serial.println(config_time2);
    Serial.println(config_time3);
    Serial.println(config_sleep);
    Serial.println(config_pulsecount);
  }
}

void setup() {
  //  pinMode(LED_BUILTIN, OUTPUT);
  //  digitalWrite(LED_BUILTIN, LOW);
  Serial.begin(115200);
  String macaddress = WiFi.macAddress();
  macaddress = macaddress.substring(0, macaddress.indexOf(":") + 6);
  clientName += "-" + macaddress;
  Serial.println(clientName);
  WiFi.setHostname(clientName.c_str());
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  Serial.println("Connected to the WiFi network");
  client.setServer(mqttServer, mqttPort);
  reconnect();
  Serial.println("STARTING");
  delay(2000);
  for (int i = 0; i < maxcalTemp; i++) {
    tempArray[i] = 0.00f;
  }
  Serial.println();
  Serial.println();
  Serial.println("STARTING Finish");
  Serial.println();
  Serial.println();

  ds18b20.begin();

  buzzer.begin(); // Init Buzzer
  relay.begin(); // Init Relay
  green.begin(); // Init LED Green
  yellow.begin(); // Init LED Yellow
  logo.begin(); // Init LED Logo
  buzzer.on(); // On Buzzer
  relay.off(); // On Relay
  green.off(); // On LED Green
  buzzer.off(); // Off Buzzer
  yellow.off(); // On LED Yellow
  fetchAPI();
  temperatureTimer.setIntervals(2000);
  ledgreenTimer.setIntervals(1000);
  timeCountTimer.setIntervals(2000);
  mqttTimer.setIntervals(2000);
  delay(500);
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  //  while (1);
}
String AT_COMMAND = "";

/*
  AT+SHOW#
  AT+TIME=XX#
*/
unsigned long postNTP = millis();
void loop(void) {
  if (millis() - postNTP >= 1000) {
    struct tm timeinfo;
    if (!getLocalTime(&timeinfo)) {
      Serial.println("Failed to obtain time");
      return;
    }
    int hr = timeinfo.tm_hour;
    int mn = timeinfo.tm_min;
    int sc = timeinfo.tm_sec;
    if (mn == 0 && (sc == 0 || sc == 1)) {

      getHttp("http://dns.sttslife.co:3123/datalog/hw/log/" + String(user_id) + "/" + String(countnew) + "/" + String(temperature, 2));
      countnew = 0;
    }
    postNTP = millis();
  }
  if (millis() - post_detectCommand >= 100 && _detectCommand) {
    buzzer.off();
    _detectCommand = false;
    post_detectCommand = millis();
  }
  while (Serial.available() > 0) {
    char c = Serial.read();
    AT_COMMAND += c;
    if (c == '#') {
      if (AT_COMMAND.indexOf("AT+SHOW#") != -1) {
        printData();
      } else if (AT_COMMAND.indexOf("AT+TIME=") != -1) {
        //        printData();
        //        Serial.println(AT_COMMAND.substring(AT_COMMAND.indexOf("=") + 1, AT_COMMAND.indexOf("#")));
        times = (AT_COMMAND.substring(AT_COMMAND.indexOf("=") + 1, AT_COMMAND.indexOf("#"))).toInt();
      }

      AT_COMMAND = "";
    }
  }
  //  Pulse_Setting = map(analogRead(VOLUME_PIN), 0, 1023, 0, PulseMax_Setting);

  temperatureTimer.run(readTemps);
  if (user_enable == 1) {
    ledgreenTimer.run(ledStatus);
    timeCountTimer.run(timeCountPrograms);
  } else {
    buzzer.off();
    green.off();
    relay.off();
    yellow.off();
    timeCountTimer.run(publishMQTT);
  }

  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}
