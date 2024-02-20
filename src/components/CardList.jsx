import React, { useState} from 'react';

const CardList = (props) => {


    const notes = props.notes;
    const deleteNote = props.deleteNote;


    const pageSize = 4; // Nombre d'éléments par page
    const [currentPage, setCurrentPage] = useState(1);


    const totalPages = Math.ceil(notes.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, notes.length - 1);
    const currentNotes = notes.slice(startIndex, endIndex + 1);

    const handlePageChange = (page) => {
        setCurrentPage(page);

    };



    // const modifyNote = (id) => {

    // }

  return (
    <>
        {/* <h3>Mes Notes</h3> */}
        <div className="row h-100">
            {currentNotes.map((note,i) => (
                <div className="col-md-3 mb-3" key={i}>
                    <div className="card text-bg-light border-dark mb-3 h-100" style={{"maxWidth": "18rem"}}>


                        {typeof note.name !== 'undefined' && (<div className="card-header">Auteur : <b>{note.firstName} {note.name}</b></div>)}





                        <div className="card-body">
                            <h5 className="card-title">{note.title}</h5>
                            <p className="card-text">{note.content}</p>
                        </div>
                        <div className='card-footer'>
                            <button  className="btn btn-success ">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                </svg>
                            </button>
                            {typeof note.name === 'undefined' && (
                            <>
                                <button
                                onClick={async ()=> {deleteNote(note.id)}}
                                className="btn btn-danger ms-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>
                                </button>
                                <button  className="btn btn-primary ms-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share" viewBox="0 0 16 16">
                                        <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>
                                    </svg>
                                </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <nav aria-label="Page navigation example">
            <ul className="pagination pagination-sm justify-content-center">

                {Array.from({ length: totalPages }, (_, index) => (
                <li
                    className={`page-item ${(index + 1) === currentPage ? 'active': ''}`}
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                >
                    <a href='#root' className="page-link">{index + 1}</a>
                </li>
                ))}
            </ul>
        </nav>
    </>
  )
}

export default CardList
