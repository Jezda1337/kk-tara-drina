import { ActionError, defineAction } from "astro:actions";
import { Resend } from "resend";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  send: defineAction({
    accept: "form",
    handler: async (fd) => {
      const fullName = fd.get("fullname");
      const phone = fd.get("phone");
      const service = fd.get("service");
      const date = fd.get("date");
      const ppl_int = fd.get("ppl_int");
      const message = fd.get("message");

      const { data, error } = await resend.emails.send({
        from: "Website Contact form>",
        to: ["info@kajakdrina.rs"],
        subject: "KK Tara Drina - Kontakt forma",
        html: `
        <p>Puno ime i prezime: <strong>${fullName}</strong></p>
        <p>Telefon: <strong>${phone}</strong></p>
        <p>Usluga: <strong>${service}</strong></p>
        <p>Datum: <strong>${date}</strong></p>
        <p>Brok osoba: <strong>${ppl_int}</strong></p>
        <p>Poruka: <strong>${message}</strong></p>
        `,
      });

      if (error) {
        throw new ActionError({
          code: "BAD_REQUEST",
          message: error.message,
        });
      }

      return data;
    },
  }),
};
