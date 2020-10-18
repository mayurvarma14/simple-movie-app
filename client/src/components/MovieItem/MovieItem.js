import React from 'react';
import {
  Typography,
  Card,
  Button,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Tooltip,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

function MovieItem({ name, director, rating }) {
  return (
    <Card className="movie">
      <CardActionArea>
        <CardMedia
          className="image"
          image="https://dummyimage.com/300x300/aaa/fff"
        />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {name}
          </Typography>
          <Tooltip title="Director" placement="bottom-start">
            <Typography variant="body2" color="textSecondary" component="p">
              {director}
            </Typography>
          </Tooltip>
          <div className="rating">
            <Rating value={rating / 2} readOnly precision={0.5} size="small" />
            <Typography className="value">{rating}/10</Typography>
          </div>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          test
        </Button>
     
      </CardActions> */}
    </Card>
  );
}

export default MovieItem;
