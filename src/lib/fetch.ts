import axios from "axios";

export const refreshToken = async (token: string) => {
  const refresh_token = await axios.get(
    `${process.env.INSTAGRAM_BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
  );

  return refresh_token.data;
};

export const sendDM = async (
  userId: string,
  recieverId: string,
  prompt: string,
  token: string
) => {
  console.log("sending message-->", userId, recieverId, prompt, token);
  return await axios.post(
    `${process.env.INSTAGRAM_BASE_URL}/v21.0/${userId}/messages`,
    {
      recipient: {
        id: recieverId,
      },
      message: {
        text: prompt,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const sendPrivateMessage = async (
  userId: string,
  recieverId: string,
  prompt: string,
  token: string
) => {
  console.log("sending the message");
  return await axios.post(
    `${process.env.INSTAGRAM_BASE_URL}/${userId}/messages`,
    {
      recipient: {
        comment_id: recieverId,
      },
      message: {
        text: prompt,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

// export const generateTokens = async (code: string) => {
//   const insta_form = new FormData();
//   // ... (append form data)

//   const shortTokenRes = await fetch(process.env.INSTAGRAM_TOKEN_URL as string, {
//     method: "POST",
//     body: insta_form,
//   });

//   console.log("Status Respons Token Jangka Pendek:", shortTokenRes.status); // <-- Tambahkan ini
//   const token = await shortTokenRes.json();
//   console.log(
//     "Respons JSON Token Jangka Pendek:",
//     JSON.stringify(token, null, 2)
//   ); // <-- Tambahkan ini

//   // Periksa apakah token.access_token ada sebelum melanjutkan
//   if (!shortTokenRes.ok || !token.access_token) {
//     console.error(
//       "Gagal mendapatkan token jangka pendek atau token.access_token tidak ada."
//     );
//     // Anda mungkin ingin mengembalikan error di sini atau melemparkannya
//     return { error: "Gagal mendapatkan token jangka pendek", details: token };
//   }

//   if (token.permissions && token.permissions.length > 0) {
//     // Perbaiki null check
//     console.log("token-->", token, "got permissions");
//   }

//   // ... (lanjut ke permintaan token jangka panjang)
//   try {
//     const long_token = await axios.get(
//       `${process.env.INSTAGRAM_BASE_URL}/access_token`, // Pisahkan URL dan params
//       {
//         params: {
//           // Gunakan objek params untuk Axios GET
//           grant_type: "ig_exchange_token",
//           client_secret: process.env.INSTAGRAM_CLIENT_SECRET as string,
//           access_token: token.access_token,
//         },
//       }
//     );
//     console.log("Respons Token Jangka Panjang:", long_token.data); // <-- Tambahkan log ini
//     return long_token.data;
//   } catch (error: any) {
//     console.error(
//       "Error saat mendapatkan token jangka panjang:",
//       error.response?.data || error.message
//     ); // Log detail error Axios
//     // Log seluruh objek error untuk inspeksi lebih lanjut jika perlu
//     // console.error("Objek Error Axios Lengkap:", error);
//     throw error; // Lempar kembali error agar bisa ditangani di luar
//   }
// };

export const generateTokens = async (code: string) => {
  const insta_form = new FormData();

  insta_form.append("client_id", process.env.INSTAGRAM_CLIENT_ID as string);

  insta_form.append(
    "client_secret",
    process.env.INSTAGRAM_CLIENT_SECRET as string
  );

  insta_form.append("grant_type", "authorization_code");

  insta_form.append(
    "redirect_uri",
    `${process.env.NEXT_PUBLIC_HOST_URL}/callback/instagram`
  );

  insta_form.append("code", code);

  const shortTokenRes = await fetch(process.env.INSTAGRAM_TOKEN_URL as string, {
    method: "POST",
    body: insta_form,
  });

  // const token = await shortTokenRes.json();

  // if (token.permissions.length > 0) {
  //   console.log("token-->", token, "got permissions");
  // }

  // const long_token = await axios.get(
  //   `${process.env.INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${token.access_token}`
  // );

  const token = await shortTokenRes.json();
  console.log(
    "RESPONS LENGKAP DARI TOKEN JANGKA PENDEK:",
    JSON.stringify(token, null, 2)
  );
  // Pastikan token.access_token benar-benar ada sebelum digunakan
  if (!token.access_token) {
    console.error(
      "Error: token.access_token tidak ditemukan dalam respons token jangka pendek!"
    );
    return; // atau throw error
  }

  // const long_token = await axios.get(
  //   `${process.env.INSTAGRAM_BASE_URL}/v23.0/oauth/access_token`, // URL dan path yang benar
  //   {
  //     params: {
  //       // Menggunakan objek 'params' lebih aman untuk encoding URL
  //       grant_type: "fb_exchange_token",
  //       client_id: process.env.INSTAGRAM_CLIENT_ID, // Ini harus ID Aplikasi Facebook Anda
  //       client_secret: process.env.INSTAGRAM_CLIENT_SECRET, // Ini harus Rahasia Aplikasi Facebook Anda
  //       fb_exchange_token: token.access_token, // Token Facebook jangka pendek Anda
  //     },
  //   }
  // );

  // graph.facebook.com/{graph-api-version}/oauth/access_token?grant_type=fb_exchange_token&client_id={app-id}&client_secret={app-secret}&fb_exchange_token={your-access-token}

  // const long_token = await axios.get(
  //   `${process.env.INSTAGRAM_BASE_URL}/access_token`,
  //   {
  //     params: {
  //       grant_type: "ig_exchange_token",
  //       client_secret: process.env.INSTAGRAM_CLIENT_SECRET as string,
  //       access_token: token.access_token,
  //     },
  //   }
  // );

  // return long_token.data;
  return token;
};

// export const generateTokens = async (code: string) => {
//   const insta_form = new FormData();

//   insta_form.append("client_id", process.env.INSTAGRAM_CLIENT_ID as string);

//   insta_form.append(
//     "client-secret",
//     process.env.INSTAGRAM_CLIENT_SECRET as string
//   );

//   insta_form.append("grant_type", "authorization_code");

//   insta_form.append(
//     "redirect_uri",
//     `${process.env.NEXT_PUBLIC_HOST_URL}/callback/instagram`
//   );

//   insta_form.append("code", code);

//   const shortTokenRes = await fetch(process.env.INSTAGRAM_TOKEN_URL as string, {
//     method: "POST",
//     body: insta_form,
//   });

//   const token = await shortTokenRes.json();

//   if (token.permissions.length > 0) {
//     console.log("token-->", token, "got permissions");
//   }

//   const long_token = await axios.get(
//     `${process.env.INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${token.access_token}`
//   );

//   return long_token.data;
// };

// export const generateTokens = async (code: string) => {
//   const insta_form = new FormData();

//   insta_form.append("client_id", process.env.INSTAGRAM_CLIENT_ID as string);
//   insta_form.append(
//     "client_secret",
//     process.env.INSTAGRAM_CLIENT_SECRET as string
//   );
//   insta_form.append("grant_type", "authorization_code");
//   insta_form.append(
//     "redirect_uri",
//     `${process.env.NEXT_PUBLIC_HOST_URL}/callback/instagram`
//   );
//   insta_form.append("code", code);

//   const shortTokenRes = await fetch(process.env.INSTAGRAM_TOKEN_URL as string, {
//     method: "POST",
//     body: insta_form,
//   });

//   const responseText = await shortTokenRes.text(); // baca response asli

//   if (!shortTokenRes.ok) {
//     console.error("Fetch token failed:", responseText); // tampilkan respons asli dari Instagram
//     throw new Error(
//       `Fetch error: ${shortTokenRes.status} ${shortTokenRes.statusText}`
//     );
//   }

//   const token = JSON.parse(responseText);

//   if (!token.access_token) {
//     throw new Error("No access_token found in token response");
//   }

//   const long_token = await axios.get(
//     `${process.env.INSTAGRAM_BASE_URL}/access_token?grant_type=ig_exchange_token&client_secret=${process.env.INSTAGRAM_CLIENT_SECRET}&access_token=${token.access_token}`
//   );

//   return long_token.data;
// };
