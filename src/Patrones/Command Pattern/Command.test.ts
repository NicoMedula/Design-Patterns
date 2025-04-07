import {
    Light,
    TurnOnLightCommand,
    TurnOffLightCommand,
    RemoteControl,
  } from './Command';
  
  describe('Command Pattern', () => {
    it('debería encender la luz', () => {
      const light = new Light();
      const command = new TurnOnLightCommand(light);
      const remote = new RemoteControl();
  
      remote.setCommand(command);
      const result = remote.pressButton();
  
      expect(result).toBe('Luz encendida');
    });
  
    it('debería apagar la luz', () => {
      const light = new Light();
      const command = new TurnOffLightCommand(light);
      const remote = new RemoteControl();
  
      remote.setCommand(command);
      const result = remote.pressButton();
  
      expect(result).toBe('Luz apagada');
    });
  });
  