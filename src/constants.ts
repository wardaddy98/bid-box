interface IConstants {
  API_URL: string | undefined;
}

const constants: IConstants = {
  API_URL: process.env.NEXT_PUBLIC_API_URL,
};

export default constants;
