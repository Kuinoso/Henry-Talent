import { Container, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { henryTheme } from '../../henryMuiTheme';
import Divider from '@material-ui/core/Divider';
import { RecruiterForm } from './form';

function RecruiterCreate() {
  return (
    <ThemeProvider theme={henryTheme}>
      <Container>
        <Typography color="primary" variant="h4">
          Agregar Recruiter
        </Typography>
        <Divider variant="middle" style={{ marginBottom: 10 }} />
        <RecruiterForm />
      </Container>
    </ThemeProvider>
  );
}

export default RecruiterCreate;
