function parseUplink(device, payload)
{
	// This function allows you to parse the received payload, and store the 
	// data in the respective endpoints. Learn more at https://wiki.cloud.studio/page/200

	// The parameters in this function are:
	// - device: object representing the device that produced the payload. 
	//   You can use "device.endpoints" to access the collection 
	//   of endpoints contained within the device. More information
	//   at https://wiki.cloud.studio/page/205
	// - payload: object containing the payload received from the device. More
	//   information at https://wiki.cloud.studio/page/208.

	// This example is written assuming a temperature and humidity sensor that 
	// sends a binary payload with temperature in the first byte, humidity 
	// in the second byte, and battery percentage in the third byte.

/*  
	// Payload is binary, so it's easier to handle as an array of bytes
	var bytes = payload.asBytes();
	
	// Verify payload contains exactly 3 bytes
	if (bytes.length != 3)
		return;

	// Parse and store temperature
	var temperatureSensor = device.endpoints.byType(endpointType.temperatureSensor);
	if (temperatureSensor != null)
	{
		var temperature = bytes[0] & 0x7f;
		if (bytes[0] & 0x80)  // Negative temperature?
			temperature -= 128;
		temperatureSensor.updateTemperatureSensorStatus(temperature);
	}

	// Parse and store humidity
	var humiditySensor = device.endpoints.byType(endpointType.humiditySensor);
	if (humiditySensor != null)
	{
		var humidity = bytes[1];
		humiditySensor.updateHumiditySensorStatus(humidity);
	}	  
	
	// Parse and store battery percentage
	var batteryPercentage = bytes[2];
	device.updateDeviceBattery({ percentage: batteryPercentage });
*/

    var payload = payload.asJsonObject()

    // Define existing endpoints in device
    var eps = device.endpoints;

    var statusCPUTempAvg = eps.byAddress("statusCPUTempAvg");
    var statusDevTtyUSB0 = eps.byAddress("statusDevTtyUSB0");
    var mqttConnected = eps.byAddress("mqttConnected");
    var startTime = eps.byAddress("startTime");
    var version = eps.byAddress("version");
    
    
    // Update CPU Temp Status
    if ('statusCPUTempAvg' in payload && statusCPUTempAvg) {
        statusCPUTempAvg.updateTemperatureSensorStatus(payload.statusCPUTempAvg);
    }

    // Update DevTtyUSB0 Status
    if ('statusDevTtyUSB0' in payload && statusDevTtyUSB0) {
        let state;
        if (payload.statusDevTtyUSB0 == true) {
            state = 1;
            statusDevTtyUSB0.updateGenericSensorStatus(state);
        } else if (payload.statusDevTtyUSB0 == false) {
            state = 2;
            statusDevTtyUSB0.updateGenericSensorStatus(state);
        } else {
            // No valid state, do not update
        }
    }

    // Update mqttConnected Status
    if ('mqttConnected' in payload && mqttConnected) {
        let state;
        if (payload.mqttConnected == true) {
            state = 1;
            mqttConnected.updateGenericSensorStatus(state);
        } else if (payload.mqttConnected == false) {
            state = 2;
            mqttConnected.updateGenericSensorStatus(state);
        } else {
            // No valid state, do not update
        }
    }

    // Update startTime Status
    // if ('startTime' in payload && startTime) {
    //     startTime.updateGenericSensorStatus(payload.startTime);
    // }
    
    // Update version Status
    if ('version' in payload && version) {

        const vid = payload.version;
        // Extract the last segment after the last dot, which should be the version number
        const lastNumber = parseInt(vid.split(".").pop(), 10);
        version.updateGenericSensorStatus(lastNumber);
    }
    
}

function buildDownlink(device, endpoint, command, payload) 
{ 
	// This function allows you to convert a command from the platform 
	// into a payload to be sent to the device.
	// Learn more at https://wiki.cloud.studio/page/200

	// The parameters in this function are:
	// - device: object representing the device to which the command will
	//   be sent. 
	// - endpoint: endpoint object representing the endpoint to which the 
	//   command will be sent. May be null if the command is to be sent to 
	//   the device, and not to an individual endpoint within the device.
	// - command: object containing the command that needs to be sent. More
	//   information at https://wiki.cloud.studio/page/1195.

	// This example is written assuming a device that contains a single endpoint, 
	// of type appliance, that can be turned on, off, and toggled. 
	// It is assumed that a single byte must be sent in the payload, 
	// which indicates the type of operation.

/*
	 payload.port = 25; 	 	 // This device receives commands on LoRaWAN port 25 
	 payload.buildResult = downlinkBuildResult.ok; 

	 switch (command.type) { 
	 	 case commandType.onOff: 
	 	 	 switch (command.onOff.type) { 
	 	 	 	 case onOffCommandType.turnOn: 
	 	 	 	 	 payload.setAsBytes([30]); 	 	 // Command ID 30 is "turn on" 
	 	 	 	 	 break; 
	 	 	 	 case onOffCommandType.turnOff: 
	 	 	 	 	 payload.setAsBytes([31]); 	 	 // Command ID 31 is "turn off" 
	 	 	 	 	 break; 
	 	 	 	 case onOffCommandType.toggle: 
	 	 	 	 	 payload.setAsBytes([32]); 	 	 // Command ID 32 is "toggle" 
	 	 	 	 	 break; 
	 	 	 	 default: 
	 	 	 	 	 payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 	 	 break; 
	 	 	 } 
	 	 	 break; 
	 	 default: 
	 	 	 payload.buildResult = downlinkBuildResult.unsupported; 
	 	 	 break; 
	 }
*/

}