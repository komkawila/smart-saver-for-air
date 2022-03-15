#include "StructObject.h"
#include "Config.h"
#include <WiFi.h>
#include <PubSubClient.h>

int count = 0;

WiFiClient espClient;
PubSubClient client(espClient);
Timer Timer1;
bool enables = false;
float Slope_Setting = 0.04;     // Slope Setting
// not use
float temp_cutoff = 30; // Temp Cutoff
float temp_MaxOffset = -2; // Temp Max Offset
float temp_MinOffset = 2; // Temp Min Offset
//end not use
int TimeNo1_Setting = 30;       // Time No.1 Back
int TimeNo2_Setting = 450;      // Time No.2 Start
int TimeNo3_Setting = 3600;     // Time No.3 End

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

void setup() {
//  pinMode(LED_BUILTIN, OUTPUT);
//  digitalWrite(LED_BUILTIN, LOW);
  Serial.begin(115200);
  WiFi.setHostname(clientName.c_str());
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }

  Serial.println("Connected to the WiFi network");
  client.setServer(mqttServer, mqttPort);
  reconnect();

  //  while (!client.connected()) {
  //    Serial.println("Connecting to MQTT...");
  //    if (client.connect(clientName, mqttUser, mqttPassword )) {
  //      Serial.println("connected");
  //    } else {
  //      Serial.print("failed with state ");
  //      Serial.print(client.state());
  //      delay(2000);
  //    }
  //  }
  Timer1.setIntervals(2000);
}
//unsigned long pre2 = 0;
//unsigned long post2 = 0;
void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  Timer1.run(publishMQTT);
  //  pre2 = millis();
  //  if (pre2 - post2 >= 2000) {
  //    publishMQTT();
  //    post2 = pre2;
  //  }
//  digitalWrite(LED_BUILTIN, LOW);
}
bool ledyellow = true;
bool ledgreen = false;
bool ledred = true;
int countred = 0;
int countyellow = 10;

void publishMQTT() {
  Serial.print("Send....");
  //  digitalWrite(LED_BUILTIN, HIGH);
  ledyellow = !ledyellow;
  ledgreen = !ledgreen;
  ledred = !ledred;
  countred ++;
  countyellow++;
  if (countred >= 100) countred = 73;
  if (countyellow >= 100) countyellow = 11;
  //  String json = "{";
  //  json += "\"user_id\": \"" + String(topic) + "\",";
  //  json += "\"temperature\": \"" + String(float(random(2000, 2500) / 100.0), 2) + "\",";
  //  json += "\"ledyellow\": \"" + String(ledyellow) + "\",";
  //  json += "\"ledgreen\": \"" + String(ledgreen) + "\",";
  //  json += "\"ledred\": \"" + String(ledred) + "\",";
  //  json += "\"countred\": \"" + String(countred) + "\",";
  //  json += "\"countyellow\": \"" + String(countyellow) + "\"";
  //  json += "}";


  String json = "{";
  json += "\"user_id\": \"" + String(topic) + "\",";
  json += "\"temperature\": \"" + String(float(random(2000, 2500) / 100.0), 2) + "\",";
  json += "\"ledyellow\": \"" + String(ledyellow) + "\",";
  json += "\"ledgreen\": \"" + String(ledgreen) + "\",";
  json += "\"ledred\": \"" + String(ledred) + "\",";
  json += "\"countred\": \"" + String(countred) + "\",";
  json += "\"countyellow\": \"" + String(countyellow) + "\",";
  json += "\"enables\": \"" + String(enables) + "\",";
  json += "\"slope\": \"" + String(Slope_Setting, 2) + "\",";
  json += "\"temp_cutoff\": \"" + String(temp_cutoff, 2) + "\",";
  json += "\"temp_MaxOffset\": \"" + String(temp_MaxOffset) + "\",";
  json += "\"temp_MinOffset\": \"" + String(temp_MinOffset) + "\",";
  json += "\"TimeNo1_Setting\": \"" + String(TimeNo1_Setting) + "\",";
  json += "\"TimeNo2_Setting\": \"" + String(TimeNo2_Setting) + "\",";
  json += "\"TimeNo3_Setting\": \"" + String(TimeNo3_Setting) + "\"";
  json += "}";

  client.publish(topic.c_str(), json.c_str());
  Serial.println(" Ok");
  //  Serial.print("state send : ");
  //  Serial.println(client.publish(topic, json.c_str()));
  //  while (!(client.publish(topic.c_str(), json.c_str()))) {
  //    reconnect();
  //  }
  //  client.loop();
}
