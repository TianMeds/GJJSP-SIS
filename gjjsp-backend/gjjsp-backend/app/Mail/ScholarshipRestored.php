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

class ScholarshipRestored extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */

    public $user;
    public $restoredName;
    public $scholarshipCateg;
    
    public function __construct(User $user, $restoredName, ScholarshipCateg $scholarshipCateg)
    {
        $this->user = $user;
        $this->restoredName = $scholarshipCateg->scholarship_categ_name;
        $this->scholarshipCateg = $scholarshipCateg;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Scholarship Category Restored',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.categ-restore',
        );
    }

    public function build()
    {
        return $this->subject('Scholarship Category Restored')
                        ->view('mail.categ-restore')
                        ->with('restoredName', $this->restoredName);
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
