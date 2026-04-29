export default function RFQ(){
return (
<form action='/functions/rfq' method='post'>
<input name='email' placeholder='Email'/>
<textarea name='message'/>
<button>Send</button>
</form>
)
}