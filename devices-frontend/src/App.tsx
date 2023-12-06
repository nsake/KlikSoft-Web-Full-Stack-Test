import $api from './api/api';

import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Button, TextField } from '@mui/material';

import './App.css';
import { errorNotification, successNotification } from './toasts';
import { error } from 'console';

type FormData = {
  devicesQuantity: string;
  frequency: string;
};

function App() {
  const { register, handleSubmit, formState } = useForm<FormData>();

  const { errors } = formState;

  const onSubmit = async (data: FormData) => {
    try {
      const response = await $api.post('/devices/set-settings', data);

      if (response) {
        successNotification('Saved!');
      }
    } catch (err) {
      console.log(err);

      errorNotification('Something went wrong');
    }
  };

  return (
    <div className="App">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          gap: '20px',
          width: '300px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',

          padding: '20px',

          margin: '0 auto',
        }}
      >
        <TextField
          {...register('devicesQuantity', { required: true, min: 1 })}
          label="Devices"
          fullWidth
          type="number"
          margin={'dense'}
          error={!!errors.devicesQuantity}
          helperText={
            errors.devicesQuantity && errors.devicesQuantity.type !== 'min'
              ? 'Поле обязательно для заполнения'
              : 'Минимальное значение 1'
          }
        />
        <TextField
          {...register('frequency', { required: true, min: 1 })}
          label="Frequency"
          fullWidth
          type="number"
          margin={'dense'}
          error={!!errors.frequency}
          helperText={
            errors.frequency && errors.frequency.type !== 'min'
              ? 'Поле обязательно для заполнения'
              : 'Минимальное значение 1'
          }
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Save
        </Button>
      </form>

      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
