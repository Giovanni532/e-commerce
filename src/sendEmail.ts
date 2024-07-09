export const sendEmail = () => {
    fetch("/api/sendEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
}