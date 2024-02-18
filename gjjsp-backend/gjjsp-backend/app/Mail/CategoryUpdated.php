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

class CategoryUpdated extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */

    public $user;
    public $previousName; // Declare $previousName variable
    public $scholarshipCateg;

    public function __construct(User $user, $previousName, ScholarshipCateg $scholarshipCateg)
    {
        $this->user = $user;
        $this->previousName = $previousName;
        $this->scholarshipCateg = $scholarshipCateg;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Scholarship Category Updated',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.updateCateg',
        );
    }

    public function build()
    {
        return $this->subject('Scholarship Category Updated')
                    ->view('mail.updateCateg')
                    ->with('previousName', $this->previousName);
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
