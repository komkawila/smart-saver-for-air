#define VOLUME_PIN 34 // A0

#define BUZZER_PIN 27 // 7

#define RELAY_PIN 32 // Active High 6
#define LED_GREEN_PIN 33 // Active Low 5
#define LED_YELLOW_PIN 25 // Active Low 8

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
