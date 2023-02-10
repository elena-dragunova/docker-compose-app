import { memo, FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button } from '@mui/material';

import styles from './HomePage.module.css';

const HomePageComponent: FC = () => (
  <Box className={styles.homePageContainer}>
    <h1>Boilerplate (v. 0.0.0-dev) works 🎉🎉🎉</h1>
    <section>
      <h2>Next steps:</h2>
      <ol className={styles.nextStepsList}>
        <li>
          Globally replace
          <code className={styles.code}>saritasa-react-boilerplate</code>
          to your project name in
          <em>kebab-case</em>
        </li>
        <li>Set up the environment</li>
        <li>
          Delete the <code className={styles.code}>posts</code> and <code className={styles.code}>home</code> features
        </li>
        <li>Fill the root README with relevant data and remove the information about the boilerplate setup</li>
        <li>
          Adjust CODEOWNERS of your application, make sure you have at least
          one code reviewer before starting a project 👨‍💻
        </li>
      </ol>
      <p>
        <strong>And that&apos;s it, your&apos;re ready to go! 🥷😎</strong>
      </p>
    </section>
    <Button
      component={RouterLink}
      variant='contained'
      color="inherit"
      to="posts"
    >
      Posts
    </Button>
  </Box>
);

export const HomePage = memo(HomePageComponent);
