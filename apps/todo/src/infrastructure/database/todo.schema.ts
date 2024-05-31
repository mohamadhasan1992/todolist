// src/infrastructure/database/todo/todo.schema.ts
import { Schema, Document } from 'mongoose';



export const TodoListSchema = new Schema({
  label: { type: String, required: true },
  user: { type: String },
});

export interface TodoListDocument extends Document {
    label: string;
    user: string;
    isCompleted: boolean;
}