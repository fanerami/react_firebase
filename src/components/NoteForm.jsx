import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";


const timeout = 500;
let timer;

const NoteForm = (props) => {




    // get props
    const writeNote = props.writeNote;
    const users = props.users;
    const id = props.id;
    const data = props.data


    //console.log(data);
    // value to add or modify in database
    const [title, setTitle] = useState(data["title"]);
    const [content, setContent] = useState(data["content"]);
    const [selectedUsers, setSelectedUsers] = useState(props.selectedUsers);


    // for navigation
    const navigate = useNavigate();

    // function called to treat the form
    const handleForm = async (e) => {
        e.preventDefault();

        data["title"] = title;
        data["content"] = content;
        data["sharedWith"] =  selectedUsers.length >0 ? selectedUsers.map(user => user.id): []


        writeNote(id, data).then(() => {
            navigate("/notes");
        })

    }


    // function for CKeditor

    const editorWrapperRef = useRef()
    const updateEditorHeight = () => {
        setTimeout(() => {
          if (editorWrapperRef.current) {
            const box = editorWrapperRef.current
            box.querySelector('.ck-editor__editable_inline').style.height = (box.offsetHeight - 50) + 'px'
          }
        }, timeout)
    }

    const updateContent = async (event, editor) => {
        clearTimeout(timer)
        const data = editor.getData()

        setContent(data)

    }


    // function for select

    const isOptionEqualToValue = (option, value) => {
        // Customize the equality test based on your requirements
        return option.id === value.id;
    };





  return (
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-6 offset-md-3">
            <div className="card">
                <div className="card-body">
                <form
                onSubmit={handleForm}
                className="signup-form">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Titre</label>
                        <input
                            type='title'
                            className="form-control"
                            value={title}
                            id="title"
                            onChange={(e) => setTitle(e.target.value)}
                            required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Content</label>

                        <CKEditor
                            className="form-control"
                            id="content"
                            editor={ClassicEditor}
                            data={content}
                            onChange={updateContent}
                            onFocus={updateEditorHeight}
                            onBlur={updateEditorHeight}
                        />
                    </div>
                    <div className="mb-3">


                        <Autocomplete
                            id="combo-box-demo"
                            multiple
                            disableCloseOnSelect
                            value={selectedUsers}
                            options={users}

                            getOptionLabel={option => option.text}
                            isOptionEqualToValue={isOptionEqualToValue}
                            renderInput={params => (
                                <TextField {...params} label="Share with" variant="outlined" fullWidth />
                            )}
                            // renderOption={(option, { selected }) => (
                            //     <>
                            //     <Checkbox
                            //         icon={icon}
                            //         checkedIcon={checkedIcon}
                            //         style={{ marginRight: 8 }}
                            //         checked={selected}
                            //     />
                            //     {option.text}
                            //     </>
                            // )}
                            onChange={(_, selectedOptions) => setSelectedUsers(selectedOptions)}
                            />
                    </div>
                    {id === null && (
                        <button type="submit" className="btn btn-success">Ajouter</button>
                    )}
                    {id !== null && (
                        <button type="submit" className="btn btn-success">Modifier</button>
                    )}
                    <button
                    onClick={() => {navigate("/notes")}}
                    className="btn btn-danger ms-2">Annuler</button>
                </form>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default NoteForm
