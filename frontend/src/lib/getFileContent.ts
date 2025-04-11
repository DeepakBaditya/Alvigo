export const getFileContent = async (codePath: string) => {
  try {
    const res = await fetch(
      `/api/getFileContent?codePath=${encodeURIComponent(codePath)}`
    );
    const data = await res.json();
    return data.code || {};
  } catch (error) {
    console.error("Error fetching code:", error);
    return {};
  }
};
