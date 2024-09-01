import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Stories from '../components/Stories';

test('renders Stories component', () => {
  render(<Stories />);
  expect(screen.getByText(/Stories about Mom/i)).toBeInTheDocument();
});

test('adds a new story', () => {
  render(<Stories />);
  fireEvent.change(screen.getByPlaceholderText(/Your name/i), { target: { value: 'John' } });
  fireEvent.change(screen.getByPlaceholderText(/Your story/i), { target: { value: 'A great story' } });
  fireEvent.click(screen.getByText(/Add Story/i));
  expect(screen.getByText(/John:/i)).toBeInTheDocument();
  expect(screen.getByText(/A great story/i)).toBeInTheDocument();
});