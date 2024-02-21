<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\GraduatingDocument;
use App\Models\User;

class GraduatingDocumentReminder extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */

    public $graduatingDocument;
    public $user;

    public function __construct(GraduatingDocument $graduatingDocument, User $user)
    {
        $this->graduatingDocument = $graduatingDocument;
        $this->user = $user;
    }
    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Graduating Document Reminder',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.graduating-reminder',
        );
    }

    public function build()
    {   
        return $this->subject('Graduating Document Reminder')
                    ->view('mail.graduating-reminder')
                    ->with('user', $this->user);
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
