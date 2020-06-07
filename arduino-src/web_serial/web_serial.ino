#include <Wire.h>

const int SLAVE_ADDRESS = 1;
byte incomingByte = 0;

void setup() {  
  Wire.begin();         // join I2C bus as a Master
  Serial.begin(9600);
}

void loop() {}

void serialEvent(){
  incomingByte = Serial.read();
  Wire.beginTransmission(SLAVE_ADDRESS);
  Wire.write(incomingByte);
  Wire.endTransmission();
}
