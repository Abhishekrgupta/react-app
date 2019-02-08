class ProductService {
  getData() {
    let promise = fetch("http://localhost:4070/api/products");
    return promise;
  }

  postData(prd) {
    let promise = fetch("http://localhost:4070/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(prd)
    });

    return promise;
  }

  deleteData(id) {
    console.log("In service :\n Deleted For id:" + id + " \n");
    let promise = fetch("http://localhost:4070/api/products/" + id, {
      method: "DELETE"
    });
    return promise;
  }

  putData(id, prd) {
    console.log(
      "In service :\n For id:" + id + " \n" + JSON.stringify(prd) + "\n"
    );
    let promise = fetch("http://localhost:4070/api/products/" + id, {
      method: "PUT",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(prd)
    });
    return promise;
  }
}

export default ProductService;
