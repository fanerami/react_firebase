import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material'
import { red, blue } from '@mui/material/colors';
import React from 'react';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useNavigate } from 'react-router-dom';






const CardNote = (props) => {
    // get data from parent
    const note = props.note;
    const deleteNote = props.deleteMethod;

    const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: 345 }}>
        <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: note.shared ? red[500] : blue[500] }} aria-label="recipe">
                  {note.name[0].toUpperCase()}
                </Avatar>
              }
            title={`${note.firstName} ${note.name}`}
        />


        <CardMedia
            component="img"
            height="194"
            image="https://pmtips.net/Portals/0/EasyDNNNews/2137/700600p546EDNmainimg-3-types-of-tools-for-project-task-management1.jpg"
            alt="Note img"
        />

        <CardContent>
            <Typography variant="body2" color="text.secondary" noWrap>
                {/* <div dangerouslySetInnerHTML={{ __html: note.content }} /> */}
                {note.title}
            </Typography>
        </CardContent>

        <CardActions disableSpacing>
            <IconButton
                aria-label="edit"
                onClick={() => navigate(`/notes/modify/${note.id}`)}
            >
                <EditNoteIcon/>
            </IconButton>
            {!note.shared && (
                <>
                    <IconButton
                        aria-label="delete"
                        onClick={()=> deleteNote(note.id)}
                    >
                        <DeleteIcon/>
                    </IconButton>

                    <IconButton aria-label="share">
                        <ShareIcon/>
                    </IconButton>
                </>
            )}

        </CardActions>
    </Card>
  )
}

export default CardNote
