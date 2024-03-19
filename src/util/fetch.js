export const RegisterUser = async (data) => {
  const res = await fetch("http://localhost:5000/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  const newdata = await res.json();
  return newdata;
};

export const LoginUser = async (data) => {
  const res = await fetch(
    "http://localhost:5000/users?email=" +
      data.email +
      "&password=" +
      data.password
  );
  const newdata = await res.json();
  return newdata;
};

export const GetAllDoctors = async () => {
  const res = await fetch("http://localhost:5000/doctors");
  const result = await res.json();
  return result;
};

export const GetAllAppointment = async (id) => {
  const res = await fetch("http://localhost:5000/appointments?user_id=" + id);
  const result = await res.json();
  return result;
};

export const GetDoctorDetails = async (id) => {
  const res = await fetch("http://localhost:5000/doctors/" + id);
  const result = await res.json();
  return result;
};

export const BookNewAppointment = async (data) => {
  const res = await fetch("http://localhost:5000/appointments", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  return result;
};

export const RateNewAppointment = async (selectedDoctor, comments) => {
  const res = await fetch(
    "http://localhost:5000/doctors/" + selectedDoctor.doctor_id,
    {
      method: "PATCH",
      body: JSON.stringify({ comments }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await res.json();
  return result;
};

export const CheckAvailableSlot = async (data) => {
  const res = await fetch(
    `http://localhost:5000/appointments?date=${data.date}&&time_slot=${data.time_slot}`
  );
  const result = await res.json();
  return result;
};
