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

class ProjectPartnerDeleted extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */

    public $user;
    public $deletedName; // Declare $deletedName variable
    public $projectPartner;

    public function __construct(User $user, $deletedName, ProjectPartner $projectPartner)
    {
        $this->user = $user;
        $this->deletedName = $deletedName;
        $this->projectPartner = $projectPartner;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Project Partner Deleted',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.deletePartner',
        );
    }

    public function build()
    {
        return $this->subject('Project Partner Deleted')
                    ->view('mail.deletePartner')
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
