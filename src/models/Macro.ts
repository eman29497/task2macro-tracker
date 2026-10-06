import mongoose, { Schema, Document } from 'mongoose';

export interface IMacro extends Document {
  title: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  date: string;
}

const MacroSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Macro || mongoose.model<IMacro>('Macro', MacroSchema);