int ledPin = 13;  // Pin connected to LED

void setup() {
  pinMode(ledPin, OUTPUT);  // Set LED pin as output
  Serial.begin(9600);       // Begin serial communication
}

void loop() {
  if (Serial.available() > 0) {
    char command = Serial.read();
    if (command == '1') {
      digitalWrite(ledPin, HIGH);  // Turn LED on
    } else if (command == '0') {
      digitalWrite(ledPin, LOW);   // Turn LED off
    }
  }
}
