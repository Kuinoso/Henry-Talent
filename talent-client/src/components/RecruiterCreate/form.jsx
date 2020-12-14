import { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useStyles } from './styles.js';
import axios from 'axios';
import { ThemeProvider } from '@material-ui/core';
import { henryTheme } from '../../henryMuiTheme.js';
import Notification from './notification';

const initialValues = {
  contactName: '',
  email: '',
  company: '',
  siteUrl: '',
};

export function RecruiterForm() {
  // ====== HOOKS ====== //
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(true);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const classes = useStyles();

  // ====== HANDLERS ====== //
  const handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setValues({ ...values, [id]: value });
    setErrors(validate({ ...values, [id]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createRecruiter(values, setValues, setErrors, notify, setNotify);
    return;
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit} autoComplete="off">
      <div>
        <TextField
          error={errors.contactName ? true : false}
          label="Nombre completo del contacto"
          variant="filled"
          helperText={errors.contactName ? 'Campo Requerido' : null}
          fullWidth
          id={'contactName'}
          value={values.contactName}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          error={errors.email ? true : false}
          label="Email"
          variant="filled"
          helperText={errors.email ? 'Campo Requerido' : null}
          fullWidth
          id={'email'}
          value={values.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          error={errors.company ? true : false}
          label="Empresa"
          helperText={errors.company ? 'Campo Requerido' : null}
          variant="filled"
          fullWidth
          id={'company'}
          value={values.company}
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          error={errors.siteUrl ? true : false}
          label="Web"
          helperText={errors.siteUrl ? 'Campo Requerido' : null}
          variant="filled"
          fullWidth
          id={'siteUrl'}
          value={values.siteUrl}
          onChange={handleChange}
        />
      </div>
      <ThemeProvider theme={henryTheme}>
        <Button
          disabled={
            !errors || JSON.stringify(errors) !== JSON.stringify({})
              ? true
              : false
          }
          className={classes.submitbtn}
          color="primary"
          variant="contained"
          type="submit"
          fullWidth
        >
          {!errors || JSON.stringify(errors) !== JSON.stringify({})
            ? 'Completar todos los campos'
            : 'Crear Recruiter'}
        </Button>
      </ThemeProvider>
      <Notification notify={notify} setNotify={setNotify} />
    </form>
  );
}

// ====== HELPER FUNCTIONS ====== //

const createRecruiter = (hook, setHook, setErrors, notify, setNotify) => {
  axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/recruiters`, hook)
    .then((response) => {
      setHook(initialValues);
      setErrors(true);
      setNotify({
        isOpen: true,
        message: 'Recruiter creado con éxito',
        type: 'success',
      });
      return response.data;
    })
    .then((response) => {
      console.log(response);
      axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/folders/${localStorage.getItem(
          'activeFolderId'
        )}?recruiterId=${response.id}`
      );
      return;
    })
    .catch((error) => {
      console.log(error);
      setNotify({
        isOpen: true,
        message: 'Oops... ocurrió un error.',
        type: 'error',
      });
      return;
    });
};

const validate = (input) => {
  let errors = {};
  if (!input.contactName) {
    errors.contactName = 'Este campo es requerido';
  }
  if (!input.company) {
    errors.company = 'Este campo es requerido';
  }
  if (!input.siteUrl) {
    errors.siteUrl = 'Este campo es requerido';
  }
  if (!input.email) {
    errors.email = 'Este campo es requerido';
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input.email)) {
    errors.email = 'Ingresar un formato de e-mail válido';
  }
  return errors;
};
