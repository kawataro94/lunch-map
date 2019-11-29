import React from 'react';
import Switch from '@material-ui/core/Switch';
import StateActionCreators from "../flux/actions/StateActionCreators";

export default () => {
  const [canResisterState, setCanResisterState] = React.useState(false);

  const handleChange = e => {
    setCanResisterState(e.target.checked);
    StateActionCreators.changeCanRegisterState(canResisterState);
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