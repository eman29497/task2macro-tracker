import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Macro from '@/models/Macro';

// GET: Sabhi macro entries fetch karne ke liye
export async function GET() {
  try {
    await dbConnect();
    const macros = await Macro.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: macros }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Nayi macro entry add karne ke liye
export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    
    // Validation
    if (!body.title || !body.calories || !body.protein || !body.carbs || !body.fats) {
      return NextResponse.json({ success: false, error: 'Please fill all fields' }, { status: 400 });
    }

    const newMacro = await Macro.create(body);
    return NextResponse.json({ success: true, data: newMacro }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}