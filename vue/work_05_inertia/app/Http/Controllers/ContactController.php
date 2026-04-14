<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Models\Contact;
use Inertia\Inertia;
use Illuminate\Http\Request;

use App\Models\Organization;
use App\Models\Country;

class ContactController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = $request->all('search');

        $contacts = Contact::with(['organization', 'country'])
            // Query Scope
            ->search($filters['search'] ?? '')
            ->latest('id')
            ->paginate();

        return Inertia::render('Contacts/Index', compact('contacts', 'filters'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $organizations = Organization::orderBy('name')->get();
        $countries = Country::orderBy('name')->get();
        return Inertia::render('Contacts/Create', compact('organizations', 'countries'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'organization_id' => 'required',
            'country_id' => 'required',
            'email' => 'required|email|unique:contacts',
            'phone' => 'required',
            'address' => 'required',
            'post_code' => 'required',
            'city' => 'required',
            'state' => 'required',
        ]);

        $contact = Contact::create($data);

        return redirect()->route('contact.edit', $contact)->with('success', 'Contact created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Contact $contact)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contact $contact)
    {
        $organizations = Organization::orderBy('name')->get();
        $countries = Country::orderBy('name')->get();

        return Inertia::render('Contacts/Edit', compact('contact', 'organizations', 'countries'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contact $contact)
    {
        $data = $request->validate([
            'first_name' => 'required',
            'last_name' => 'required',
            'organization_id' => 'required',
            'country_id' => 'required',
            'email' => 'required|email|unique:contacts',
            'phone' => 'required',
            'address' => 'required',
            'post_code' => 'required',
            'city' => 'required',
            'state' => 'required',
        ]);

        $contact->update($data);

        return redirect()->route('contact.edit', $contact)->with('success', 'Contact updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();

        return redirect()->route('contact.index')->with('success', 'Contact deleted.');
    }
}
