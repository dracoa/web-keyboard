// slave_receiver.ino
// Refer to the "master_sender" example for use with this
#include <Wire.h>
#include <Keyboard.h>
#include <Mouse.h>

const int SLAVE_ADDRESS = 1;
byte in = 0;

void setup() {  
  Wire.begin(SLAVE_ADDRESS);    // join I2C bus as a slave with address 1
  Wire.onReceive(receiveEvent); // register event
}

void loop() {
}

void receiveEvent(int howMany){
  while (Wire.available()) {
    in = Wire.read();
    if (in >= 32 && in <= 127){
      Keyboard.press(in);  
    } 
    if (in >=160 && in <= 255){
      Keyboard.release(in - 128);  
    }
    if (in == 21 || in == 22){
      Mouse.press(in - 20);
    }
    if (in == 149 || in == 150){
      if (Mouse.isPressed(in - 148)){
        Mouse.release(in - 148);
      }
    }
  }
}
