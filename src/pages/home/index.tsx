import React, { useState } from 'react';
import styles from './home.module.scss';

type Card = {
  id: number;
  title: string;
  description: string;
};

const HomePage = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editCardId, setEditCardId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (!title || !description) {
      setError('Both title and description are required.');
      return false;
    }
    setError(null);
    return true;
  };

  const addCard = () => {
    if (!validateForm()) return;

    const newCard: Card = {
      id: Date.now(),
      title,
      description,
    };
    setCards([...cards, newCard]);
    setTitle('');
    setDescription('');
  };

  const updateCard = () => {
    if (!validateForm() || editCardId === null) return;

    setCards(
      cards.map(card =>
        card.id === editCardId ? { ...card, title, description } : card,
      ),
    );
    setTitle('');
    setDescription('');
    setEditCardId(null);
  };

  const deleteCard = (id: number) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const startEdit = (card: Card) => {
    setEditCardId(card.id);
    setTitle(card.title);
    setDescription(card.description);
  };

  return (
    <div className={styles.container}>
      <h2>Cards</h2>
      <ul className={styles.cardList}>
        {cards.map(card => (
          <li key={card.id} className={styles.card}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <button
              onClick={() => startEdit(card)}
              className={styles.editButton}
            >
              Edit
            </button>
            <button
              onClick={() => deleteCard(card.id)}
              className={styles.deleteButton}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <h2>{editCardId === null ? 'Add Card' : 'Edit Card'}</h2>
      <div className={styles.formGroup}>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className={styles.input}
        />
        <textarea
          placeholder="Add a description for your card..."
          value={description}
          onChange={e => setDescription(e.target.value)}
          className={styles.textarea}
        />
        <button
          onClick={editCardId === null ? addCard : updateCard}
          className={styles.submitButton}
        >
          {editCardId === null ? 'Add' : 'Update'}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
