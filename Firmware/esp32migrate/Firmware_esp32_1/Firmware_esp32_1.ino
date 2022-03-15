#include "Header.h"
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
  if (temperature >= SleepTemps) {
    if (sleeps >= CountSleep_Setting) {
      relay.off(); // On Relay
      green.off(); // On LED Green
      yellow.off(); // On LED Yellow
    } else {
      sleeps++;
    }
  } else {
    sleeps = 0;
    startFunc();
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
      (yellow_state) ? yellow.on() : yellow.off();
    } else {
      if (times >= TimeNo1_Setting)
        (slope <= -0.005) ? yellow.on() : yellow.off();
    }

    relay.off();
  } else {
    countRelay += 2;
    if (countRelay >= relayStartTime) {
      _Start = false;
      relay.off();
    }
    yellow.off();
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
  _green = !_green;
  (_green) ? green.on() : green.off();
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

void setup() {
  Serial.begin(57600);
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

  buzzer.on(); // On Buzzer
  temperatureTimer.setIntervals(2000);
  ledgreenTimer.setIntervals(1000);
  timeCountTimer.setIntervals(2000);
  delay(500);
  relay.off(); // On Relay
  green.off(); // On LED Green  
  buzzer.off(); // Off Buzzer
  yellow.off(); // On LED Yellow
}
String AT_COMMAND = "";

/*
  AT+SHOW#
  AT+TIME=XX#
*/
void loop(void) {
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
  Pulse_Setting = map(analogRead(VOLUME_PIN), 0, 1023, 0, PulseMax_Setting);
  temperatureTimer.run(readTemps);
  ledgreenTimer.run(ledStatus);
  timeCountTimer.run(timeCountPrograms);
}
