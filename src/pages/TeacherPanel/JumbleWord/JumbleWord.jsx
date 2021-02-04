import React from 'react';

import { Helmet } from 'react-helmet';

import {
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(4),
  },
  title: {},
  mainGrid: {
    padding: theme.spacing(2),
  },
  componentBackground: {
    backgroundColor: '#f5f5f5',
    border: '1px solid #eee',
    padding: theme.spacing(1),
  },
}));

const JumbleWord = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Helmet>
        <title>ENGLISHTREE - Random word</title>
      </Helmet>

      <Container>
        <Typography component="h2" variant="h4">
          Random letters in a word
        </Typography>
        <Typography component="p" gutterBottom variant="subtitle2">
          Select or add a category and enter a word which will be shuffled and added
          to the excercise.
        </Typography>
      </Container>

      <Divider />

      <Grid className={classes.mainGrid} container spacing={2}>
        <Grid component="section" item xs={4}>
          <Paper className={classes.componentBackground}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita, nam
            nobis? Delectus dicta eveniet, doloribus unde, tempore repellendus quasi,
            atque sed mollitia accusantium aliquid sunt repellat repudiandae odit
            quos corrupti. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Ab iure suscipit recusandae quis. Perspiciatis velit debitis tenetur
            doloremque esse itaque aliquid quia culpa optio consequatur cumque
            repellat earum, voluptate accusantium! Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Impedit odio a pariatur ab quos animi non
            id temporibus, repellat aliquid omnis architecto sapiente tempore debitis
            maiores dolorem tenetur cumque eos ipsa officia quas. Iste doloremque,
            incidunt minima, alias facere distinctio delectus voluptatum adipisci vel
            laboriosam ipsam molestias! Dolores, id odit! Officiis, consectetur sit
            voluptate quos est itaque, nostrum aliquam tempora consequuntur debitis
            ex aliquid hic alias quidem nesciunt blanditiis quod laudantium ab
            voluptatem! Corporis totam in at? Id ut nam qui rem dolores?
            Necessitatibus distinctio blanditiis ullam! Officiis enim impedit, eaque
            aliquam quibusdam, obcaecati deleniti neque, vitae rem quo soluta.
          </Paper>
        </Grid>
        <Grid component="section" item xs={8}>
          <Paper className={classes.componentBackground}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati fugit
            beatae earum aliquid. Repellendus quas sed cum voluptates, sint aliquam
            officiis, magni provident, qui quam tenetur expedita laborum quidem
            deleniti. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non
            unde ipsa, nihil architecto dolores repellendus provident id labore
            delectus sint quibusdam totam, aut recusandae eligendi debitis enim
            veniam officia? Magnam! Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Illo, nulla provident? Asperiores, repellendus nostrum
            odit ullam perferendis debitis veritatis expedita voluptates nam
            architecto neque alias, quisquam adipisci ut distinctio cupiditate!
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default JumbleWord;
