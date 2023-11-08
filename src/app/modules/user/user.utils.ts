import User from "./user.model";

// generate student id
const getLastStudentId = async (): Promise<string | null> => {
  const lastId = await User.findOne({ role: "student" }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastId?.id ? lastId.id.substring(4) : "0";
};

export const generateStudentId = async (): Promise<string> => {
  const lastId: string = (await getLastStudentId()) as string;
  const currentId = (Number(lastId) + 1).toString().padStart(5, "0");

  return `S-${currentId}`;
};

// generate instructor id
const getLastInstructorId = async (): Promise<string | null> => {
  const lastId = await User.findOne({ role: "instructor" }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastId?.id ? lastId.id.substring(2) : "0";
};

export const generateInstructorId = async (): Promise<string> => {
  const lastId: string = (await getLastInstructorId()) as string;
  const currentId = (Number(lastId) + 1).toString().padStart(5, "0");

  return `I-${currentId}`;
};

// generate admin id
const getLastAdminId = async (): Promise<string | null> => {
  const lastId = await User.findOne({ role: "admin" }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastId?.id ? lastId.id.substring(2) : "0";
};

export const generateAdminId = async (): Promise<string> => {
  const lastId: string = (await getLastAdminId()) as string;
  const currentId = (Number(lastId) + 1).toString().padStart(5, "0");

  return `A-${currentId}`;
};
