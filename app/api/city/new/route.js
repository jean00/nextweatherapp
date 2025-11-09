import { connectToDB } from '@/utils/database';
import City from '@/models/city';

export const POST = async (req, res) => {
  const { userId, name, country } = await req.json();
  try {
    await connectToDB();
    if (await City.findOne({ name: name, country: country })) {
      return new Response('Failed to save the city', { status: 409 });
    }
    const newCity = new City({ creator: userId, name, country });
    await newCity.save();
    return new Response(JSON.stringify(newCity), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response('Failed to save the city', { status: 500 });
  }
};
