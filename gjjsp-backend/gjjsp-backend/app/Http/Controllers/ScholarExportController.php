<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\ScholarsExport;

class ScholarExportController extends Controller
{
    // Method to handle the export
    public function exportScholars(Request $request)
{
    $fromYear = $request->input('fromYear');
    $toYear = $request->input('toYear');
    return (new ScholarsExport($fromYear, $toYear))->download('scholars.xlsx');
}

}
