<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use App\Models\ScholarshipCateg;

class CategoryDeleted extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */

     public $user;
     public $deletedName;
     public $scholarshipCateg;
 
     public function __construct(User $user, $deletedName, ScholarshipCateg $scholarshipCateg)
     {
         $this->user = $user;
        $this->deletedName = $scholarshipCateg->scholarship_categ_name;
         $this->scholarshipCateg = $scholarshipCateg;
     }
    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Scholarship Category Deleted',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.deleteCateg',
        );
    }

    public function build()
    {
        return $this->subject('Scholarship Category Deleted')
                        ->view('mail.deleteCateg')
                        ->with('deletedName', $this->deletedName);
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
