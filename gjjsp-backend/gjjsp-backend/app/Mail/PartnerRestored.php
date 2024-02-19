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

class PartnerRestored extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */

    public $user;
    public $restoredName; // Declare $restoredName variable
    public $projectPartner;

    public function __construct(User $user, $restoredName, ProjectPartner $projectPartner)
    {
        $this->user = $user;
        $this->restoredName = $restoredName;
        $this->projectPartner = $projectPartner;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Project Partner Restored',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.partner-restore',
        );
    }

    public function build()
    {
        return $this->subject('Project Partner Restored')
                    ->view('mail.partner-restore')
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
