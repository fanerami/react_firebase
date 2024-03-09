import { Box, Button, Grid, Pagination, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CardNote from './CardNote';
import { useNavigate } from 'react-router-dom';

const CardNotesList = (props) => {

    const myNotes = props.myNotes;
    const notesSharedWithMe = props.notesSharedWithMe;


    const navigate = useNavigate();

    // concatenate all notes
    const allNotes = myNotes.concat(notesSharedWithMe);

    // console.log(notesSharedWithMe);
    const cardsPerPage = 6;

    //use for filter
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("");



    const filteredNotes = allNotes.filter(note =>
      note.title.toLowerCase().includes(filter.toLowerCase()) ||
      note.content.toLowerCase().includes(filter.toLowerCase())
    );



    // Computing starting and ending index for pagination
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = page * cardsPerPage;

    // Card pagination
    const paginatedNotes = filteredNotes.slice(startIndex, endIndex);

    // Fonction pour changer de page
    const handlePageChange = (event, value) => {
      setPage(value);
    };


    // useEffect(() => console.log(allNotes))

  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>

        <Box sx={{ flex: 1}}>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/notes/add")}
          >
              Ajouter une note
          </Button>
        </Box>
        <Box>
          <TextField
            label="Filtrer par titre ou contenu"
            variant="outlined"
            value={filter}
            // sx={{ display: 'flex',alignItems: 'center', marginBottom: '20px'}}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Box>
      </Box>
      <Grid container spacing={3}>
        {allNotes && allNotes.length > 0 && (
          <>
            {paginatedNotes.map((note,i) => (
              <Grid item key={i} xs={12} sm={6} md={4}>
                <CardNote note={note} deleteMethod={props.deleteMethod}/>
              </Grid>
            ))}
          </>
        )}
        {allNotes.length===0 && (<h3>Aucune Notes</h3>)}
      </Grid>
      <Pagination
        count={Math.ceil(filteredNotes.length / cardsPerPage)}
        page={page}
        onChange={handlePageChange}
        style={{ marginTop: '20px' }}
      />
    </>
  )
}

export default CardNotesList
