import React, { useState, useEffect, Fragment } from 'react';
import { FaPlus, FaEdit, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './Timeline.css';

const TimelinePage = ({ page, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(page.title);
  const [editedContent, setEditedContent] = useState(page.content);
  const [editedImage, setEditedImage] = useState(page.image);

  const handleSave = () => {
    onEdit(page.id, { title: editedTitle, content: editedContent, image: editedImage });
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="timeline-page">
      {isEditing ? (
        <div className="edit-form">
          <input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="edit-title"
            placeholder="כותרת"
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="edit-content"
            placeholder="תוכן"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="edit-image-input"
          />
          <button onClick={handleSave} className="save-button">שמור</button>
        </div>
      ) : (
        <>
          <h2>{page.title}</h2>
          {page.image && <img src={page.image} alt={page.title} className="page-image" />}
          <p>{page.content}</p>
          <div className="page-controls">
            <button onClick={() => setIsEditing(true)} className="edit-button">
              <FaEdit />
            </button>
            <button onClick={() => onDelete(page.id)} className="delete-button">
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

function Timeline() {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const initialPages = [
      { id: 1, title: "לידת אמא", content: "ביום זה וזה, נולדה אמא היקרה שלנו.", image: null },
      { id: 2, title: "ילדות", content: "תקופת הילדות של אמא הייתה מלאה בחוויות...", image: null },
    ];
    setPages(initialPages);
  }, []);

  const addPage = () => {
    const newPage = {
      id: Date.now(),
      title: "אירוע חדש",
      content: "תאר את האירוע כאן...",
      image: null
    };
    setPages([...pages, newPage]);
    setCurrentPage(pages.length);
  };

  const editPage = (id, updatedData) => {
    setPages(pages.map(page => 
      page.id === id ? { ...page, ...updatedData } : page
    ));
  };

  const deletePage = (id) => {
    setPages(pages.filter(page => page.id !== id));
    if (currentPage >= pages.length - 1) {
      setCurrentPage(Math.max(0, pages.length - 2));
    }
  };

  return (
    <div className="timeline-container">
      <h1>ספר החיים של אמא</h1>
      <div className="book">
        <div className="page left-page"></div>
        <div className="page right-page">
          {pages.length > 0 ? (
            <TimelinePage
              page={pages[currentPage]}
              onEdit={editPage}
              onDelete={deletePage}
            />
          ) : (
            <p>אין עמודים עדיין. הוסף את העמוד הראשון!</p>
          )}
        </div>
      </div>
      <div className="navigation">
        <button
          onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
          className="nav-button"
        >
          <FaChevronLeft />
        </button>
        <span>{currentPage + 1} / {pages.length}</span>
        <button
          onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
          disabled={currentPage === pages.length - 1}
          className="nav-button"
        >
          <FaChevronRight />
        </button>
      </div>
      <button onClick={addPage} className="add-page">
        <FaPlus /> הוסף עמוד חדש
      </button>
    </div>
  );
}

export default Timeline;