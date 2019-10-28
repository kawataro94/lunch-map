import React from 'react';
import Switch from '@material-ui/core/Switch';

export default function Switches() {
  const [canResisterState, setCanResisterState] = React.useState(true);

  const handleChange = e => {
    setCanResisterState(e.target.checked);
  };

  return (
    <div style={{ marginRight: 10 }}>
      <Switch
        checked={canResisterState}
        onChange={handleChange}
        value="canResisterState"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    </div>
  );
}