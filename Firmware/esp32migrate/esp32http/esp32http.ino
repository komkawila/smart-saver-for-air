
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "komkawila_2.4GHz";
const char* password =  "12345678";
String user_username = "user11";
String clientName = "sttslife-" + user_username;

// ########################################################
String user_password;
int user_modes = 0;
int user_enable = 0;
float config_slope;
float config_tempcutoff;
float config_templeak;
int config_timeleak;
int config_time1;
int config_time2;
int config_time3;
int config_sleep;
int config_pulsecount;

void setup() {
  Serial.begin(57600);
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
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
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
    user_modes = doc["user_modes"];
    user_enable = doc["user_enable"];

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

void loop() {
  fetchAPI();
  delay(5000);
}
