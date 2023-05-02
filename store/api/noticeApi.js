export const getNoticeData = async (page, perPage) => {
  const res = await getItemsByPage(page, perPage);
  return {
    data: {
      data: res
    }
  };
}

const getItemsByPage = async (pageNumber, itemsPerPage) => {
  const data = dummyData();

  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return {
    total: data.length,
    data: data.slice(startIndex, endIndex)
  };
}

const dummyData = () => {
  const dummyData = [];

  for (let i = 0; i < 30; i++) {
    dummyData.push({
      id: i + 1,
      title: `Data ${i + 1}: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, adipisci!`,
      date: `2022-04-${i + 1}`,
      important: false
    });
  }

  return dummyData;
}