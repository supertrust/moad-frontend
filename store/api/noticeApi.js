export const getNoticeData = async (page, perPage) => {
  const res = await getItemsByPage(page, perPage);
  return {
    data: {
      data: res
    }
  };
}

export const getNoticeDetail = (id) => {
  return new Promise((resolve, reject) => {
    const load = () => {
      const datas = dummyData();
      datas.forEach((v, i) => {
        if (i === datas.length) {
          return reject({
            response: {
              data: {
                message: "Data not found"
              }
            }
          });
        }
        if (v.id === parseInt(id)) {
          const data = {
            data: {
              data: {
                content: v,
                prev: i > 0 ? datas[i - 1].id : null,
                next: i < datas.length - 1 ? datas[i + 1].id : null,
              }
            }
          }

          return resolve(data);
        }
      });
    }
    setTimeout(load, 1000);
  });
}

const getItemsByPage = (pageNumber, itemsPerPage) => {
  return new Promise((resolve, reject) => {
    const load = () => {
      const data = dummyData();

      const startIndex = (pageNumber - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      resolve({
        total: data.length,
        data: data.slice(startIndex, endIndex)
      });
    }

    setTimeout(load, 1000);
  });
}

const dummyData = () => {
  const dummyData = [];

  for (let i = 0; i < 30; i++) {
    dummyData.push({
      id: i + 1,
      image: `https://dev-icarus.mufin.lol/wp-content/uploads/kboard_attached/1/202212/63a964a5c01d49057168.png`,
      title: `Data ${i + 1}: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia, adipisci!`,
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, culpa obcaecati necessitatibus, delectus nulla quas ad voluptate quaerat tempore cupiditate, nobis harum? Impedit consectetur quasi velit at maiores odit dolores debitis, ratione quidem eligendi corrupti quod odio, tempora atque fuga illum beatae recusandae nemo dolorum. Iure molestias, distinctio delectus ducimus odit quidem illo tempora possimus quaerat pariatur deleniti nemo, accusantium assumenda magni ea temporibus voluptates velit, omnis culpa unde modi. Id, impedit et ratione vitae asperiores quo aut doloremque fugiat earum illum? Voluptatum fuga distinctio eveniet eos non id minus. Sit sapiente culpa minus vitae at sequi perferendis cupiditate soluta nisi consequuntur ut odio exercitationem voluptatem perspiciatis dolor nihil eaque, hic doloribus, optio alias totam sint necessitatibus. Similique deleniti eveniet magnam saepe dolor, autem dolores adipisci tempore a assumenda culpa voluptate totam nobis illo. Tempora labore aliquid quia harum impedit neque deserunt delectus explicabo accusantium illo quaerat eius quasi iste suscipit a, facere repudiandae qui est vero eum optio commodi itaque laborum repellendus. Laborum esse suscipit, nisi, consequuntur ipsam iusto deleniti nulla enim vero obcaecati magni dicta corrupti saepe sed minus ipsa voluptate optio. Quam vero provident, eum, blanditiis autem aliquid, reprehenderit nostrum ipsa consequatur corporis harum quisquam excepturi temporibus sit sint animi! Omnis repellendus quibusdam veritatis natus in non mollitia, aperiam, voluptates ipsum eveniet ea a consectetur quasi adipisci blanditiis dolores ut libero. Adipisci magnam eos neque commodi veniam sint ea pariatur dolorum consectetur natus officia delectus, maiores sed, eligendi quaerat perspiciatis error ex deserunt? Mollitia, suscipit. Id culpa ipsa perferendis cupiditate repellendus non perspiciatis deserunt dolorem consectetur ex ipsam, consequatur alias. Quisquam perspiciatis alias, commodi rerum beatae nisi. Doloribus fugiat architecto hic dolorem ullam optio harum nemo, minima perferendis molestiae accusantium consequatur dolore sapiente maxime at ab suscipit. Porro quas voluptas magni culpa qui, iusto esse rem accusamus facere, provident quisquam illo ipsa quidem eos. Dignissimos cumque quidem itaque voluptatibus recusandae omnis dicta. Dolore, perspiciatis cumque quo placeat debitis error! Laudantium, velit. Deleniti qui numquam rem vel harum eum at asperiores, vitae adipisci et assumenda maiores laboriosam, deserunt voluptates accusantium? Maiores maxime in fugiat, cumque corrupti atque quis quae nam soluta quo quasi rerum a doloribus expedita veniam. Cum dolores ad a fuga harum nulla. Quas quia facere aspernatur nobis architecto voluptatem illo porro doloribus? Obcaecati culpa autem aspernatur minus dolorem ea maxime cum officiis necessitatibus labore consectetur architecto dolorum vero odio quas beatae, magni dignissimos voluptatem ab illo modi! Repudiandae mollitia aliquam hic tenetur odio ut architecto quo aut enim facere at maiores quod, unde optio accusantium illum dolorum earum magni aliquid ipsa vitae alias inventore quas dolore. Rerum assumenda voluptates harum accusantium ipsa ipsum odit asperiores maxime obcaecati, ratione libero voluptatem distinctio mollitia perferendis. Porro dolores blanditiis sed cupiditate aspernatur velit impedit, ipsa perferendis itaque, ut excepturi magnam quam tempora autem? Voluptatum, facere nulla ea accusantium quibusdam fugiat totam officiis nobis, eum iure maiores illum sit deserunt pariatur unde consequuntur nam quam amet exercitationem mollitia dolorem suscipit, ipsa hic? Deleniti ratione dolorem harum quas aliquid ducimus?`,
      date: `2022-04-${i + 1}`,
      important: false
    });
  }

  return dummyData;
}