import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const userId = params.id;
    const res = await User.findById(userId);
    return new Response(JSON.stringify(res), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
};
