<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\User;
use App\Models\Scholar;
use App\Models\ScholarFamMember;
use App\Models\HighSchoolAcadDetails;
use App\Models\UndergradAcadDetails;

class ScholarProfileUpdated extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public $user;
    public $updatedFields;
    public $updatedScholarFamMem;
    public $updatedHighschoolAcadDetails;
    public $updatedUndergradAcadDetails;
    public $scholar;

    public function __construct(User $user, array $updatedFields, Scholar $scholar)
    {
        $this->user = $user;
        $this->updatedFields = $updatedFields;
        $this->scholar = $scholar;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Scholar Profile Updated',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'mail.scholar-profile-updated',
        );
    }

    public function build()
    {
        return $this->subject('Scholar Profile Updated')
                    ->view('mail.scholar-profile-updated');
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
