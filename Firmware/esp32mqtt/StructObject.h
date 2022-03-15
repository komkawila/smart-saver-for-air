struct Timer {
  unsigned long pre = millis();
  unsigned long post = millis();
  int intervals;

  void setIntervals(int times) {
    intervals = times;
  }

  void run(void func()) {
    pre = millis();
    if (pre - post >= intervals) {
      func();
      post = pre;
    }
  }
};
