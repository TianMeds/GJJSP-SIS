<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use App\Models\ProjectPartner;

class ProjectPartnerUpdated extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */

    public $user;
    public $previousName; // Declare $previousName variable
    public $projectPartner;

    public function __construct(User $user, $previousName, ProjectPartner $projectPartner)
    {
        $this->user = $user;
        $this->previousName = $previousName;
        $this->projectPartner = $projectPartner;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Project Partner Updated',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.updatePartner',
        );
    }

    public function build()
    {
        return $this->subject('Project Partner Updated')
                    ->view('mail.updatePartner')
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
