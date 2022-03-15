#define VOLUME_PIN A0

#define BUZZER_PIN 7

#define RELAY_PIN 6 // Active High
#define LED_GREEN_PIN 5 // Active Low
#define LED_YELLOW_PIN 8 // Active Low

struct IO {
  byte pins;
  bool actives;

  void begin() {
    pinMode(pins, OUTPUT);
  }

  void on() {
    digitalWrite(pins, (!actives ? false : true));
  }

  void off() {
    digitalWrite(pins, (!actives ? true : false));
  }
};
