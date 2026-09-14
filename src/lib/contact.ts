export interface ContactRequest { name:string;email:string;phone:string;office:string;subject:string;message:string;privacyAccepted:boolean; }
export type ContactResult = { kind:'local';message:string } | { kind:'sent';message:string };
export interface ContactAdapter { submit(request:ContactRequest):Promise<ContactResult>; }
// Production delivery belongs in an authenticated/rate-limited server endpoint.
// This local adapter deliberately does not transmit or persist enquiry contents.
export const contactAdapter:ContactAdapter={async submit(_request){return {kind:'local',message:'Lomakkeen tiedot ovat kunnossa. Tämä sivusto toimii paikallisesti, joten viestiä ei lähetetty. Voit tavoittaa toimiston puhelimitse tai sähköpostitse.'};}};
export function validateContact(value:ContactRequest):Record<string,string>{
 const errors:Record<string,string>={};
 if(value.name.trim().length<2)errors.name='Kirjoita nimesi.';
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email.trim()))errors.email='Tarkista sähköpostiosoitteen muoto.';
 if(!['Joensuu','Jyväskylä','Lappeenranta','Ei väliä'].includes(value.office))errors.office='Valitse toimipiste.';
 if(value.message.trim().length<10)errors.message='Kerro asiastasi vähintään 10 merkillä.';
 if(!value.privacyAccepted)errors.privacyAccepted='Vahvista, että olet tutustunut tietosuojaselosteeseen.';
 return errors;
}
