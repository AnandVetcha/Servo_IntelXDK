
var AIO_pin = 0;//setup access analog input Analog pin #0 (A0) i.e. output of potentiometer. Assuming values read is between 0 and 1000.
var Servo_pin = 5;//Initialize PWM on Digital Pin #5 (D5) and enable the pwm pin
var PWM_period_us = 20000;
var Min_Duty_Cycle = 0.029;
var Max_Duty_Cycle = 0.087;


var mraa = require("mraa"); //require mraa
console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to the Intel XDK console
var analogPin0 = new mraa.Aio(AIO_pin); 
var pwm = new mraa.Pwm(Servo_pin); 
pwm.enable(false);
pwm.period_us(PWM_period_us);


pwm.enable(true);
moveServo();

function moveServo() {
    var analogValue = analogPin0.read(); //read the value of the analog pin
    var processedValue = MapRange(analogValue,0,1000,Min_Duty_Cycle,Max_Duty_Cycle);
    pwm.write(processedValue); //Write duty cycle value.
    console.log(analogValue+" "+processedValue+pwm.read());
    setTimeout(moveServo,200);
}


function MapRange (in_vaule, in_min, in_max, out_min, out_max) {
    var output = (in_vaule - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    if (output >= out_max) {
        output = out_max;
    } else {
        if (output <= out_min) {
            output = out_min;
        }
    }           
    return output
}
